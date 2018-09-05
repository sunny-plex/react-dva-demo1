import PAGE_HOME from '@/pages/home/main'
import PAGE_MAIN_RECT from '@/pages/main-rect/main'
import PAGE_NOT_FOUND from '@/pages/not-found/main'
import PAGE_UNDER_CONSTRUCT from '@/pages/under-construct/main'

const pageRoutes = {}
pageRoutes['/home'] = PAGE_HOME
pageRoutes['/main-rect'] = PAGE_MAIN_RECT
pageRoutes['/not-found'] = PAGE_NOT_FOUND
pageRoutes['/under-construct'] = PAGE_UNDER_CONSTRUCT

if ((process.env).NODE_ENV === 'development' && module.hot) { module.hot.accept() }

export default pageRoutes
