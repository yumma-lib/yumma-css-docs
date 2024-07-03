export const withDescription = `
<div class="bg-l-yellow-6 fs-sm p-4 rad-1 t-d-yellow-6">
    <div class="d-f">
        <div class="fs-0">
            <svg class="dim-5 fs-0 mt-1" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 9V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M12 17.01L12.01 16.9989" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="ml-4">
            <h3 class="fs-sm fw-600">Oh no! The server connection has failed.</h3>
            <div class="fs-sm mt-1 t-d-yellow-4">Unfortunately, an internal error occurred on the server, which prevented the saving of your progress.</div>
        </div>
    </div>
</div>`;

export const withList = `
<div class="bg-l-red-6 fs-sm p-4 rad-1 t-d-red-6">
    <div class="d-f">
        <div class="fs-0">
            <svg class="fs-0 dim-5 mt-1" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="ml-4">
            <h3 class="fs-sm fw-600">Something went wrong when you submitted your data.</h3>
            <div class="fs-sm mt-2 t-d-red-4">
                <ul class="lst-d pl-4 s-y-1">
                    <li>Please agree to the terms and conditions.</li>
                    <li>Username must be between 3 and 20 characters.</li>
                    <li>Passwords do not match.</li>
                </ul>
            </div>
        </div>
    </div>
</div>`;

export const withActions = `
<div class="bg-l-teal-6 fs-sm p-4 rad-1 t-d-teal-6">
    <div class="d-f">
        <div class="fs-0">
            <svg class="fs-0 dim-5 mt-1" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="ml-3">
            <h3 class="fs-md fw-600">Order completed</h3>
            <div class="fs-sm mt-2 t-d-teal-4">Your order has been received and is currently being prepared for delivery.</div>
            <div class="mt-4">
                <div class="d-f s-x-3">
                    <button type="button" class="ai-c bg-transparent cg-2 d-if fs-sm fw-600 h:t-d-teal-6 t-d-teal-4">View status</button>
                    <button type="button" class="ai-c bg-transparent cg-2 d-if fs-sm fw-600 h:t-d-teal-6 t-d-teal-4">Dismiss</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

export const withLinksOnRight = `
<div class="bg-l-blue-6 fs-sm p-4 rad-1 t-d-blue-6">
    <div class="d-f">
        <div class="fs-0">
            <svg class="fs-0 dim-5 mt-1" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.5V16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 7.51L12.01 7.49889" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <div class="f-1 md:d-f md:jc-sb ml-2">
            <p class="fs-sm">New software update available. See what's new in version 7.0.0.</p>
            <p class="fs-sm md:ml-6"><a class="fw-500 h:t-blue t-d-blue-6" href="#">Schedule</a></p>
        </div>
    </div>
</div>`;

export const withAccentBorder = `
<div class="bc-l-red-2 bg-l-red-6 bl-4 fs-sm p-4">
    <div class="d-f">
        <div class="fs-0">
            <span class="ai-c b-4 bc-l-red-5 bg-l-red-4 d-if dim-10 jc-c rad-full t-d-red-6">
                <svg class="fs-0 dim-5" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </span>
        </div>
        <div class="ml-3">
            <h3 class="fw-600 t-d-red-6">
                Purchase incomplete
            </h3>
            <p class="fs-sm t-d-red-5">
                The funds currently available are not enough to complete this transaction.
            </p>
        </div>
    </div>
</div>`;

export const withDismissButton = `
<div class="bg-l-teal-6 fs-sm p-4 rad-1 t-d-teal-6">
    <div class="d-f">
        <div class="fs-0">
            <svg class="fs-0 dim-5 mt-1" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12.5L10 15.5L17 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
        <div class="ml-3">
            <h3 class="fs-md fw-600">
                Your file has been uploaded successfully.
            </h3>
        </div>
        <div class="ml-auto pl-3">
            <button type="button" class="bg-l-teal-6 d-if h:bg-teal h:t-white p-1 rad-1 t-teal">
                <svg class="fs-0 dim-5" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
    </div>
</div>`;