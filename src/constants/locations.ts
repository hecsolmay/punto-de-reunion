export type BUILDING_KEY = 'c' | 'f' | 'h' | 'g' | 'm' | 't'

export const UTM_LOCATIONS: Record<BUILDING_KEY, number[]> = {
  c: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
  f: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
  h: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
  g: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
  m: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 201, 202, 203, 204, 205, 206, 207, 208],
  t: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112]
}

export const BUILDING_KEY_ARRAY = Object.keys(UTM_LOCATIONS) as BUILDING_KEY[]
export const SEARCH_KEY_ARRAY = Object.entries(UTM_LOCATIONS).flatMap(([key, values]) => values.map((value) => `${key}-${value}`))
