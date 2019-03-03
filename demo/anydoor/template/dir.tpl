<!document html>
<html>
  <head>
    <meta charset='utf-8'>
  </head>
  <body>
    {{#each files}}
      <p>
        <a href="{{../dir}}/{{this}}">{{this}}</a>
      </p>
    {{/each}}
  </body>
</html>