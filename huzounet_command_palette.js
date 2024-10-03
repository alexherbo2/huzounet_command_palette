const buttonElements = document.querySelectorAll('button[data-action]')

for (const buttonElement of buttonElements) {
  switch (buttonElement.dataset.action) {
    case 'toggleDarkMode':
      buttonElement.addEventListener('click', toggleDarkMode)
      break
  }
}

function toggleDarkMode() {
  document.body.style.colorScheme = (
    document.body.style.colorScheme === 'dark' ? 'light' : 'dark'
  )
}
