import { Router } from '@vaadin/router'

import './routes/home-route'

class HashRouter extends Router {
  __updateBrowserHistory({ hash }: URL) {
    if (hash) {
      window.location.hash = hash
    }
  }
}

function globalHashChangeHandler(event: HashChangeEvent) {
  event.preventDefault()
  const pathname = event.newURL.split('#')[1]

  if (pathname) {
    Router.go('nambururu-lit' + pathname)
  }
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element is missing')
}

const router = new HashRouter(rootElement)

HashRouter.setTriggers({
  activate() {
    window.addEventListener('hashchange', globalHashChangeHandler, false)
  },

  inactivate() {
    window.removeEventListener('hashchange', globalHashChangeHandler, false)
  },
})

router.baseUrl = '/nambururu-lit/'

router.setRoutes([
  { path: '/', component: 'home-route' },
  {
    path: '/settings',
    component: 'settings-route',
    action: async () => {
      await import('./routes/settings-route.ts')
    },
  },
  {
    path: '/lists',
    component: 'lists-route',
    action: async () => {
      await import('./routes/lists-route.ts')
    },
  },
  {
    path: '/edit/:list?',
    component: 'edit-list-route',
    action: async () => {
      await import('./routes/edit-list-route.ts')
    },
  },
  {
    path: '/blocked-title-keywords',
    component: 'edit-blocked-title-keywords-route',
    action: async () => {
      await import('./routes/edit-blocked-title-keywords-route.ts')
    },
  },
  {
    path: '/blocked-subreddits',
    component: 'edit-blocked-subreddits-route',
    action: async () => {
      await import('./routes/edit-blocked-subreddits-route.ts')
    },
  },
])
