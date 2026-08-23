/* Copy this file to add a new piece. Steps:
   1. Rename the file and the ARTICLES key below to a unique id.
   2. Fill in meta, title, body.
   3. Add <script src="js/articles/your-id.js"></script> in index.html, after js/app.js and js/charts.js.
   4. Add a matching <article class="card" onclick="showArticle('your-id')"> block in index.html's #landing.
   Delete this comment block once copied. */

ARTICLES['your-id'] = {
  meta: 'Article · Category',
  title: 'Piece Title',
  body: `
  <p>First paragraph.</p>

  <!-- Image example:
  <div class="article-media">
    <img src="media/your-id/photo.jpg" alt="Description of the image" />
    <p class="article-media-caption">Caption text.</p>
  </div>
  -->

  <!-- Video example:
  <div class="article-media">
    <video src="media/your-id/clip.mp4" controls></video>
    <p class="article-media-caption">Caption text.</p>
  </div>
  -->

  <h2>Section Heading</h2>
  <p>More content.</p>
`
};
