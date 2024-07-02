export const withDescription = `
<div class="bg-l-yellow-6 fs-sm p-4 rad-1 t-d-yellow-6">
    <div class="d-f">
        <div class="fs-0"><svg class="dim-4 fs-0 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
            </svg></div>
        <div class="ml-4">
            <h3 class="fs-sm fw-600">Oh no! The server connection has failed.</h3>
            <div class="fs-sm mt-1 t-d-yellow-4">Unfortunately, an internal error occurred on the server, which
                prevented the saving of your progress.</div>
        </div>
    </div>
</div>`;

export const withList = `
<div class="bg-l-red-6 fs-sm p-4 rad-1 t-d-red-6">
    <div class="d-f">
        <div class="fs-0"><svg class="fs-0 dim-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
            </svg></div>
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
        <div class="fs-0"><svg class="fs-0 dim-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
            </svg></div>
        <div class="ml-3">
            <h3 class="fs-md fw-600">Order completed</h3>
            <div class="fs-sm mt-2 t-d-teal-4">Your order has been received and is currently being prepared for
                delivery.</div>
            <div class="mt-4">
                <div class="d-f s-x-3"><button type="button"
                        class="ai-c bg-transparent cg-2 d-if fs-sm fw-600 h:t-d-teal-6 rad t-d-teal-4">View
                        status</button><button type="button"
                        class="ai-c bg-transparent cg-2 d-if fs-sm fw-600 h:t-d-teal-6 rad t-d-teal-4">Dismiss</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

export const withLinksOnRight = `
<div class="bg-l-blue-6 fs-sm p-4 rad-1 t-d-blue-6">
    <div class="d-f">
        <div class="fs-0"><svg class="fs-0 dim-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
            </svg></div>
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
                <svg class="fs-0 dim-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
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
            <svg class="fs-0 dim-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
            </svg>
        </div>
        <div class="ml-3">
            <h3 class="fs-md fw-600">
                Your file has been uploaded successfully.
            </h3>
        </div>
        <div class="ml-auto pl-3">
            <button type="button" class="bg-l-teal-6 d-if h:bg-l-teal-1 h:t-white p-1 rad-1 t-teal">
                <svg class="fs-0 dim-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>
        </div>
    </div>
</div>`;