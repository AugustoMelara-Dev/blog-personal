import React, { useEffect, useRef, useState } from 'react';
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

  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const height = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800;

  // Render D3 on mount
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous
    d3.select(containerRef.current).selectAll('svg').remove();

    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height].join(' '))
      .style('background-color', '#0a0a0a');

    const g = svg.append('g');

    // Zoom setup
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(1));

    // Simulation
    const simulation = d3.forceSimulation<Node>(data.nodes)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('collide', d3.forceCollide().radius(12))
      .force('link', d3.forceLink<Node, Link>(data.links).id(d => d.id).distance(80))
      .force('center', d3.forceCenter(0, 0));

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#1f1f1f')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', d => d.type === 'post' ? 8 : d.type === 'tag' ? 5 : 4)
      .attr('fill', d => d.type === 'post' ? '#f5f5f5' : d.type === 'tag' ? '#a3e635' : '#525252')
      .attr('cursor', d => d.type !== 'frase' ? 'pointer' : 'default')
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // Interactivity
    node.on('mouseover', (event, d) => {
      // Highlight connections
      const connectedNodeIds = new Set<string>([d.id]);
      link.attr('stroke-opacity', (l: any) => {
        if (l.source.id === d.id || l.target.id === d.id) {
          connectedNodeIds.add(l.source.id);
          connectedNodeIds.add(l.target.id);
          return 1;
        }
        return 0.1;
      });

      node.attr('opacity', (n: any) => connectedNodeIds.has(n.id) ? 1 : 0.2);

      // Tooltip
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
        link.attr('stroke-opacity', 0.6);
        node.attr('opacity', 1);
        setTooltip(t => ({ ...t, visible: false }));
    })
    .on('click', (event, d) => {
      if (d.type === 'post' && d.slug) {
        window.location.href = `/blog/${d.slug}`;
      } else if (d.type === 'tag' && d.slug) {
        window.location.href = `/tags/${d.slug}`;
      }
    });

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node
        .attr('cx', d => d.x!)
        .attr('cy', d => d.y!);
    });

    // Reset Zoom handler exposed to global
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

  return (
    <div className="relative w-full h-[80vh] bg-[#0a0a0a] overflow-hidden">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="fixed z-50 pointer-events-none px-3 py-1.5 bg-[#111] border border-[#1f1f1f] text-[#f5f5f5] text-sm rounded-md shadow-lg"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Leyenda y Controles */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-4">
        <button 
          onClick={() => (window as any).resetMapZoom?.()}
          className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#1f1f1f] text-[#a3a3a3] hover:text-[#f5f5f5] text-sm rounded-lg transition-colors shadow-lg self-start"
        >
          Centrar mapa
        </button>
        
        <div className="bg-[#111] border border-[#1f1f1f] p-4 rounded-lg shadow-lg flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f5f5f5]"></div>
            <span className="text-sm text-[#a3a3a3]">Post</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a3e635]"></div>
            <span className="text-sm text-[#a3a3a3]">Tag</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#525252]"></div>
            <span className="text-sm text-[#a3a3a3]">Frase</span>
          </div>
        </div>
      </div>
    </div>
  );
}
