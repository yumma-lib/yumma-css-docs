export const cardContent: string = `
<div class="card">
    <div class="card-content">
        <h4 class="card-title">Yumma OS 7.2</h4>
        <p class="card-description">
            This update has some important bug fixes and also fixes an issue that
            was preventing users from enabling or disabling Advanced Data
            Protection.
        </p>
        <a class="card-link" href="/">Learn more</a>
    </div>
    <button class="card-button">Update Now</button>
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
<div class="max-w-96 ovf-h rad-3 b-1 bc-l-silver-6 bg-white p-6 bs-xs">
  <div class="fg-1">
    <h4 class="mb-2 fs-xxl fw-600 tc-d-lead-2">Yumma OS 7.2</h4>
    <p class="mb-4 tc-l-lead-3">This update has some important bug fixes and also fixes an issue that was preventing users from enabling or disabling Advanced Data Protection.</p>
    <a class="fs-sm tc-pink tdl-u" href="/"> Learn more </a>
  </div>
  <button class="mb-4 mt-6 h-12 rad-2 bg-pink px-6 fw-600 tc-white h:bg-d-pink-1">Update Now</button>
</div>
`;

export const tailwindCard: string = `
<div class="max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div class="grow">
    <h4 class="mb-2 text-3xl font-semibold leading-none text-gray-800">Yumma OS 7.2</h4>
    <p class="mb-4 text-gray-500">This update has some important bug fixes and also fixes an issue that was preventing users from enabling or disabling Advanced Data Protection.</p>
    <a class="text-sm leading-none text-pink-500 underline" href="/"> Learn more </a>
  </div>
  <button class="mb-4 mt-6 h-12 rounded-lg bg-pink-500 px-6 font-semibold text-white hover:bg-pink-600">Update Now</button>
</div>
`;
