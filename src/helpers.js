export const stringifyItems = ({ Water, Food, Ammunition, Medication}) =>
  `Water:${Water};Food:${Food};Ammunition:${Ammunition};Medication:${Medication};`

export const parseLocation = lonlat => {
  if (!lonlat) return {lat: 0, lng: 0}

  const [lat, lng] = lonlat.substring(7, lonlat.length-1).split(' ');

  return {lat: +lat, lng: +lng}
}

export const toPoint = (location) =>
  `POINT (${location.lat} ${location.lng})`

export const simpleReducer = (actionConstant, initialValue) =>
  (state = initialValue, action) =>
    (action.type === actionConstant)
      ? action.payload
      : state

export const localStorageResolver = (actionType) => ({
  SIGN_IN: 'my-survivor',
  SIGN_OUT: 'my-survivor'
}[actionType])
