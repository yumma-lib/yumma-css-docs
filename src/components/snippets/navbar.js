export const base = `
<header class="bb-1 bc-l-silver-6 bg-white d-f fs-sm fw-w py-4 sm:fw-nw sm:jc-fs w-full">
  <nav class="mx-auto px-4 sm:ai-c sm:d-f sm:jc-sb w-full">
    <a class="f-none fs-xl fw-600" href="#">App</a>
    <div class="ai-c d-f fd-r g-5 sm:jc-fe sm:pl-5">
      <a class="fw-500 tc-blue" href="#">Docs</a>
      <a class="fw-500 h:t-black tc-lead" href="#">Components</a>
      <a class="fw-500 h:t-black tc-lead" href="#">Blog</a>
    </div>
  </nav>
</header>
`;

export const withCollapse = `
<header class="bb-1 bc-l-silver-6 bg-white d-f fs-sm fw-w py-4 sm:fw-nw sm:jc-fs w-full">
  <nav class="mx-auto px-4 sm:ai-c sm:d-f sm:jc-sb w-full">
    <div class="ai-c d-f jc-sb">
      <a class="f-none fs-xl fw-600" href="#">App</a>
      <div class="sm:d-none">
        <button class="c-p ai-c b-1 bc-l-silver-6 bg-white bs-sm cg-2 d-if jc-c p-2 rad-2 tc-d-silver-6">
          <svg class="dim-4 fs-0" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M3 12H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M3 19H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="d-none fb-full fg-1 ovf-h sm:d-b">
      <div class="d-f fd-c g-5 sm:ai-c sm:fd-r sm:jc-fe sm:pl-5">
        <a class="fw-500 tc-blue" href="#">Docs</a>
        <a class="fw-500 h:t-black tc-lead" href="#">Components</a>
        <a class="fw-500 h:t-black tc-lead" href="#">Blog</a>
      </div>
    </div>
  </nav>
</header>
`;