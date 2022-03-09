/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */

// eslint-disable-next-line no-unused-vars
function updateScroll() {
  if (window.scrollY > 0) {
    document.getElementById('hodor').classList.add('scrolled')
  } else {
    document.getElementById('hodor').classList.remove('scrolled')
  }
}
window.addEventListener('scroll', updateScroll)
console.log('work')

const $cartWr = document.querySelector('[data-kot]')

$cartWr.addEventListener('click', async (e) => {
  if (e.target.dataset.action) {
    console.log(e.target)
    const parent = e.target.closest('[data-id]')
    console.log(e.target.closest('[data-id]'))
    const response = await fetch(`/kotiki/${parent.dataset.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: e.target.dataset.action,
      }),
    })
    if (response.status === 200) {
      const dataFromServer = await response.json()
      console.log(dataFromServer)
      const $count = parent.querySelector('[data-count]')
      $count.innerText = dataFromServer.opisanie
      parent.remove()
    }
  }
})