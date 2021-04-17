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
          Legal
        </h1>
        <p class="mt-2">Version 1.0, dated Apr 17, 2021</p>
        <div class="overflow-y-scroll py-8 px-12">
          <p class="leading-normal">
            <p>
              This Service can be used to share encrypted files between users.

              You may upload content to our servers as part of the features of the Service. By uploading content, you hereby grant us a nonexclusive, royalty-free, worldwide license to use your content in connection with the provision of the Service. You hereby represent and warrant that your content will not infringe the rights of any third party and will comply with all applicable laws.
            </p>
            <p>
              EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT, NO PARTY MAKES ANY GUARANTEES OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, WHETHER ARISING BY OPERATION OF LAW OR OTHERWISE. PROVIDER SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY AND/OR ANY IMPLIED WARRANTY OF FITNESS FOR A PARTICULAR PURPOSE.
            </p>
          </p>
        </div>
      </div>
    </main>
  `;
};
