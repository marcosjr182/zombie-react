import React from 'react';

const toLatLng = (position) =>
  new google.maps.LatLng(position.lat, position.lng);

export default class Map extends React.Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className='hidden-xs col-sm-6 map'>
        <div className='col-xs-12 map-canvas' ref="mapCanvas">
        </div>
      </div>
    )
  }

  componentWillReceiveProps(props) {
    this.map = this.createMap(props.center);
    this.marker = this.createMarker(props.center);
  }

  createMap(center) {
    const mapOptions = {
      zoom: 8,
      center: toLatLng(center)
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  createMarker(center) {
    return new google.maps.Marker({
      position: toLatLng(center),
      map: this.map
    })
  }
}
