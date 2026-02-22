<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" 
    encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="es">
      <head>
        <title>RSS — <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width"/>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            background: #0a0a0a; 
            color: #a3a3a3;
            font-family: system-ui, sans-serif;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 1px solid #1f1f1f;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
          }
          .logo { 
            font-size: 1.5rem; 
            font-weight: 900;
          }
          .logo span { color: #a3e635; }
          .subtitle { 
            color: #525252; 
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }
          .badge {
            display: inline-block;
            background: #111111;
            border: 1px solid #1f1f1f;
            color: #737373;
            font-size: 0.75rem;
            padding: 4px 10px;
            border-radius: 4px;
            margin-top: 1rem;
          }
          .item {
            border: 1px solid #1f1f1f;
            background: #111111;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
          }
          .item h2 {
            color: #f5f5f5;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
          }
          .item h2 a {
            color: #f5f5f5;
            text-decoration: none;
          }
          .item h2 a:hover { color: #a3e635; }
          .item p { 
            color: #737373; 
            font-size: 0.875rem;
            line-height: 1.7;
          }
          .date {
            color: #525252;
            font-size: 0.75rem;
            margin-top: 0.75rem;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">
            Vito<span>Logic</span>
          </div>
          <p class="subtitle">
            <xsl:value-of select="/rss/channel/description"/>
          </p>
          <span class="badge">Feed RSS</span>
        </div>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </h2>
            <p><xsl:value-of select="description"/></p>
            <p class="date"><xsl:value-of select="pubDate"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
