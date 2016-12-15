export const stringifyItems = ({ Water, Food, Ammunition, Medication}) =>
  `Water:${Water};Food:${Food};Ammunition:${Ammunition};Medication:${Medication};`

export const parseLocation = lonlat => {
  if (!lonlat) return {lat: 0, lng: 0}
  lonlat = lonlat.substring(7, lonlat.length-1).split(' ');
  return {lat: +lonlat[0], lng: +lonlat[1]}
}

export const updatableSurvivor = ({age, gender, lonlat, name}) => ({
  person: { age, gender, lonlat, name }
})
