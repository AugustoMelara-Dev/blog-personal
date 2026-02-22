import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';

type NodeType = 'post' | 'frase' | 'tag';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  title: string;
  tags?: string[];
  type: NodeType;
  slug?: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
}

interface Props {
  data: {
    nodes: Node[];
    links: Link[];
  };
}

export default function MapaGrafo({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });

  const [showPosts, setShowPosts] = useState(true);
  const [showFrases, setShowFrases] = useState(true);
  const [showTags, setShowTags] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const height = typeof window !== 'undefined' ? (window.innerHeight * 0.8 > 800 ? window.innerHeight * 0.8 : 800) : 800;

  const stats = useMemo(() => {
    const posts = data.nodes.filter(n => n.type === 'post').length;
    const tags = data.nodes.filter(n => n.type === 'tag').length;
    return { posts, tags, links: data.links.length };
  }, [data]);

  const simRef = useRef<any>(null);
  const nodesRef = useRef<any>(null);
  const linksRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    d3.select(containerRef.current).selectAll('svg').remove();

    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height].join(' '))
      .style('background-color', '#0a0a0a');

    const g = svg.append('g');
    const minimapLayer = svg.append('g').attr('class', 'minimap-layer');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4]);

    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1));

    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collide', d3.forceCollide().radius(12))
      .force('link', d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(80))
      .force('center', d3.forceCenter(0, 0));

    simRef.current = simulation;

    const link = g.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#1f1f1f')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)
      .attr('class', 'graph-link');

    linksRef.current = link;

    const node = g.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('class', 'graph-node')
      .attr('r', d => d.type === 'post' ? 8 : d.type === 'tag' ? 5 : 4)
      .attr('fill', d => d.type === 'post' ? '#f5f5f5' : d.type === 'tag' ? '#a3e635' : '#525252')
      .attr('cursor', d => d.type !== 'frase' ? 'pointer' : 'default')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    nodesRef.current = node;

    const minimapWidth = 120;
    const minimapHeight = 80;
    const minX = width - minimapWidth - 24;
    const minY = height - minimapHeight - 24;

    minimapLayer.append('rect')
      .attr('x', minX)
      .attr('y', minY)
      .attr('width', minimapWidth)
      .attr('height', minimapHeight)
      .attr('fill', '#111111')
      .attr('stroke', '#1f1f1f')
      .attr('rx', 4);

    const minimapG = minimapLayer.append('g')
      .attr('transform', `translate(${minX + minimapWidth/2}, ${minY + minimapHeight/2}) scale(0.05)`);

    minimapG.selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', 15)
      .attr('fill', d => d.type === 'post' ? '#f5f5f5' : d.type === 'tag' ? '#a3e635' : '#525252');

    const viewIndicator = minimapLayer.append('rect')
      .attr('fill', 'rgba(163, 230, 53, 0.2)')
      .attr('stroke', '#a3e635')
      .attr('stroke-width', 1);

    zoom.on('zoom', (event) => {
      g.attr('transform', event.transform);
      
      const { k, x, y } = event.transform;
      const w = minimapWidth / k;
      const h = minimapHeight / k;
      const vx = minX + minimapWidth/2 - (x / k) * 0.05 - w/2;
      const vy = minY + minimapHeight/2 - (y / k) * 0.05 - h/2;

      viewIndicator
        .attr('x', Math.max(minX, Math.min(vx, minX + minimapWidth)))
        .attr('y', Math.max(minY, Math.min(vy, minY + minimapHeight)))
        .attr('width', Math.min(Math.max(0, minimapWidth - Math.max(0, minX - vx)), w))
        .attr('height', Math.min(Math.max(0, minimapHeight - Math.max(0, minY - vy)), h));
    });

    node.on('mouseover', (event, d) => {
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        text: d.title,
      });
    })
    .on('mousemove', (event) => {
      setTooltip(t => ({ ...t, x: event.clientX, y: event.clientY }));
    })
    .on('mouseout', () => {
      setTooltip(t => ({ ...t, visible: false }));
    })
    .on('click', (event, d) => {
      if (d.type === 'post' && d.slug) {
        window.location.href = `/blog/${d.slug}`;
      } else if (d.type === 'tag' && d.slug) {
        window.location.href = `/tags/${d.slug}`;
      }
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
      
      minimapG.selectAll('circle')
        .attr('cx', (d: any) => d.x!)
        .attr('cy', (d: any) => d.y!);
    });

    // @ts-ignore
    window.resetMapZoom = () => {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1));
    };

    function dragstarted(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  useEffect(() => {
    if (!nodesRef.current || !linksRef.current) return;

    const visibleTypes = new Set();
    if (showPosts) visibleTypes.add('post');
    if (showFrases) visibleTypes.add('frase');
    if (showTags) visibleTypes.add('tag');

    const searchLower = searchQuery.toLowerCase();

    nodesRef.current
      .transition().duration(300)
      .attr('opacity', (d: Node) => {
        if (!visibleTypes.has(d.type)) return 0;
        if (searchLower && !d.title.toLowerCase().includes(searchLower)) return 0.2;
        return 1;
      })
      .style('pointer-events', (d: Node) => {
        if (!visibleTypes.has(d.type)) return 'none';
        return 'all';
      });

    linksRef.current
      .transition().duration(300)
      .attr('stroke-opacity', (d: Link) => {
        const src = d.source as Node;
        const tgt = d.target as Node;
        if (!visibleTypes.has(src.type) || !visibleTypes.has(tgt.type)) return 0;
        if (searchLower && (!src.title.toLowerCase().includes(searchLower) && !tgt.title.toLowerCase().includes(searchLower))) return 0.1;
        return 0.6;
      });

  }, [showPosts, showFrases, showTags, searchQuery]);

  return (
    <div className="relative w-full h-[80vh] bg-[#0a0a0a] overflow-hidden rounded-xl border border-[#1f1f1f]">
      {/* Input de Búsqueda y Stats */}
      <div className="absolute top-6 left-6 right-6 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 pointer-events-none">
        <div className="relative pointer-events-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#525252] w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="text"
            placeholder="Buscar en el mapa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#111111] border border-[#1f1f1f] focus:border-lime-400 focus:outline-none rounded-lg text-sm text-[#f5f5f5] py-2 pl-9 pr-4 w-64 shadow-lg transition-colors placeholder:text-[#525252]"
          />
        </div>
        <div className="text-xs text-[#525252] bg-[#111111]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-[#1f1f1f]">
          {stats.posts} posts · {stats.tags} tags · {stats.links} conexiones
        </div>
      </div>

      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="fixed z-50 pointer-events-none px-3 py-1.5 bg-[#111] border border-[#1f1f1f] text-[#f5f5f5] text-sm rounded-md shadow-lg transition-opacity"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Pane Lateral Filtros Desktop / Inferior Mobile */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-4 z-10">
        <button 
          onClick={() => (window as any).resetMapZoom?.()}
          className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#1f1f1f] text-[#a3a3a3] hover:text-[#f5f5f5] text-sm rounded-lg transition-colors shadow-lg self-start"
          title="Centrar mapa"
        >
          Centrar
        </button>
        
        <div className="bg-[#111]/90 backdrop-blur border border-[#1f1f1f] p-4 rounded-lg shadow-lg flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showPosts} 
              onChange={e => setShowPosts(e.target.checked)}
              className="accent-lime-400 w-4 h-4 bg-[#1a1a1a] border-[#333]"
            />
            <div className="w-3 h-3 rounded-full bg-[#f5f5f5]"></div>
            <span className="text-sm text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">Posts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showTags} 
              onChange={e => setShowTags(e.target.checked)}
              className="accent-lime-400 w-4 h-4 bg-[#1a1a1a] border-[#333]"
            />
            <div className="w-2.5 h-2.5 rounded-full bg-[#a3e635]"></div>
            <span className="text-sm text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">Tags</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={showFrases} 
              onChange={e => setShowFrases(e.target.checked)}
              className="accent-lime-400 w-4 h-4 bg-[#1a1a1a] border-[#333]"
            />
            <div className="w-2 h-2 rounded-full bg-[#525252]"></div>
            <span className="text-sm text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">Frases</span>
          </label>
        </div>
      </div>
    </div>
  );
}
