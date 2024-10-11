export const regularCard: string = `
<div class="card">
  <div class="card-content">
    <h4 class="card-title">Heading</h4>
    <p class="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit fugit voluptates quod, placeat quam maxime earum voluptas provident, natus omnis saepe beatae vitae.</p>
    <a class="card-link">Link to page</a>
  </div>
  <button class="card-button">Primary Button</button>
</div>
<style>
  .card {
      max-width: 23.75rem;
      border: 1px solid #e5e7e9;
      background-color: #ffffff;
      box-shadow: 1px 3px 5px -2px rgba(0, 0, 0, 0.1);
      max-width: 23.75rem;
      overflow: hidden;
      padding: 1.5rem;
      border-radius: 16px;
  }

  @media (min-width: 768px) {
      .card {
          grid-column-start: 2;
          grid-row-start: 1;
      }
  }

  .card-content {
      flex-grow: 1;
  }

  .card-title {
      font-size: 30.08px;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #32323e;
  }

  .card-description {
      margin-bottom: 1rem;
      color: #797983;
  }

  .card-link {
      font-size: 14.4px;
      color: #d4418a;
      text-decoration-line: underline;
  }

  .card-button {
      background-color: #d4418a;
      font-weight: 600;
      height: 3rem;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      border-radius: 8px;
      color: #ffffff;
      font-size: 14.4px;
  }

  .card-button:hover {
      background-color: #bf3b7c;
  }

  /* CSS Reset */

  *,
  *::before,
  *::after {
      border-width: 0;
      border-style: solid;
      box-sizing: border-box;
  }

  * {
      margin: 0;
      color: inherit;
      font-family: system-ui, sans-serif;
  }

  p,
  h4, {
      overflow-wrap: break-word;
  }
</style>
`;

export const yummaCard: string = `
<div class="max-w-96 ovf-h rad-4 b-1 bc-l-silver-6 bg-white p-6 bs-xs">
  <div class="fg-1">
    <h4 class="mb-2 fs-sm fw-600 lh-1 tc-d-lead-2">Heading</h4>
    <p class="mb-4 tc-l-lead-3 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit fugit voluptates quod, placeat quam maxime earum voluptas provident, natus omnis saepe beatae vitae.</p>
    <a class="fs-b lh-1 tc-pink tdl-u">Link to page</a>
  </div>
  <button class="mb-4 mt-6 h-12 rad-2 bg-pink px-6 fw-600 tc-white h:bg-d-pink-1">Primary</button>
</div>
`;

export const tailwindCard: string = `
<div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div class="grow">
    <h4 class="mb-2 text-2xl font-semibold leading-none text-gray-800">Heading</h4>
    <p class="mb-4 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit fugit voluptates quod, placeat quam maxime earum voluptas provident, natus omnis saepe beatae vitae.</p>
    <a class="text-base leading-none text-pink-500 underline">Link to page</a>
  </div>
  <button class="mb-4 mt-6 h-12 rounded-lg bg-pink-500 px-6 font-semibold text-white hover:bg-pink-600">Primary</button>
</div>
`;
