import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// This is important for Next.js to prevent Flash of Unstyled Content (FOUC)
config.autoAddCss = false

// Add all solid icons to the library
library.add(fas)