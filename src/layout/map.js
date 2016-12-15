import React from 'react';

export default class Map extends React.Component {
  constructor(props){
   super(props);
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
      center: this.toLatLng(center)
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  createMarker(center) {
    return new google.maps.Marker({
      position: this.toLatLng(center),
      map: this.map
    })
  }

  toLatLng(center) {
    return new google.maps.LatLng(center.lat, center.lng);
  }
}
