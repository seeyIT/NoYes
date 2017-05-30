<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
  <xsl:template match="/">
    <head>
      <title>Guestbook</title>
    </head>
    <html>
      <body>
        <table border="0" cellpadig ="2c" cellspacing="2">
          <tr>
            <th bgcolor="#cccccc" class = "auto-style1">
              <b>Name</b>
            </th>
            <th bgcolor="#cccccc" class = "auto-style2">
              <b>Email</b>
            </th>
            <th bgcolor="#cccccc" >
              <b>Entry</b>
            </th>
          </tr>
          <xsl:for-each select="guestbook/guest">
            <tr>
              <td>
                <em>
                  <xsl:value-of select="name"/>
                </em>
              </td>
              <td>
                <em>
                  <xsl:value-of select="email"/>
                </em>
              </td>
              <td>
                <em>
                  <xsl:value-of select="inscription"/>
                </em>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
