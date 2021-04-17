const html = require('choo/html');
const modal = require('./modal');

module.exports = function(state, emit) {
  state.modal = null;
  return html`
    <main class="main">
      ${state.modal && modal(state, emit)}
      <div
        class="flex flex-col items-center bg-white m-4 px-6 py-8 border border-grey-30 md:border-none md:px-12 md:py-16 shadow w-full md:h-full dark:bg-grey-90"
      >
        <h1 class="text-center text-3xl font-bold">
          ${state.translate('legalTitle')}
        </h1>
        <p class="mt-2">Version 1.0, dated Apr 17, 2021</p>
        <div class="overflow-y-scroll py-8 px-12">
          <p class="leading-normal">
            <span>We do not utilize any information retrieved except as necessary to provide the Service. Key data collected is specified below.</span>
          </p>
          <ul class="mt-6 leading-normal">
            <li class="mb-4">
              <b>Content</b>: We receive an encrypted copy of the file you
              upload but we cannot access the content or name of your encrypted
              file. By default, files are stored for a maximum of either 24
              hours or 7 days. If you choose a download cap, the file can be
              deleted from our server sooner.
            </li>
            <li class="mb-4">
              <b>Data on your device</b>: So that you can check status or delete
              files, basic information about your uploaded files is stored on
              your local device. This includes our identifier for the file, the
              filename, and the file’s unique download URL. This is cleared if
              you delete your uploaded file or upon visiting Send after the file
              expires. Note, however, that the URL will persist in your browsing
              history (and with whomever you shared it) until manually deleted.
            </li>
            <li class="mb-4">
              <b>Personal data</b>: The following is necessary to provide the
              service:
              <ul class="mt-6 leading-normal">
                <li class="mb-4">
                  <u>IP addresses</u>: We receive IP addresses of downloaders
                  and uploaders as part of our standard server logs.
                </li>
              </ul>
            </li>
            <li class="mb-4">
              <b>Non-personal data</b>: We might receive the following data:
              <ul class="mt-6 leading-normal">
                <li class="mb-4">
                  <u>Interaction data</u>: This includes information such as
                  number of people sending and receiving files, number of files
                  uploaded and approximate file sizes, percentage of file
                  downloaders who become uploaders, how people engage with the
                  website (time spent, clicks, referrer information, site exit
                  path, use of passwords).
                </li>
                <li class="mb-4">
                  <u>Technical data</u>: This includes information such as
                  operating system, browser, language preference, country,
                  timestamps, duration for file transfer, reasons for errors,
                  reasons for file expiration.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </main>
  `;
};
