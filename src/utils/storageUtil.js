
// global memory storage
const memoryStore = {}

// global memory storage functions
export const memoryStorage = {
  get: (key) => {
    return memoryStore[key]
  },
  set: (key, value) => {
    return memoryStore[key] = value
  }
}
