import { YMaps, Map, Placemark, RouteEditor } from '@pbe/react-yandex-maps';
import React, { useEffect, useState } from 'react';
// export default class MapComponent extends React.Component {
//     state = { coordinates: null };
//     geocode(ymaps) {

//         ymaps.geocode('Мытищи')
//             .then(result => this.setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
//     }
//     render() {

//         return (
//             <YMaps onApiAvaliable={ymaps => this.geocode(ymaps)}>
//                 <Map>
//                     {!this.state.coordinates ? null :

//                         <Placemark geometry={{ coordinates: this.state.coordinates }} />
//                     }

//                 </Map>
//             </YMaps>
//         );
//     }

// }


export const MapComponent = () => {
    const [state,setState]= useState()
    // const state = { coordinates: null }
    const geocode = (ymaps)=> {

        ymaps.geocode('Мытищи')
            .then(result => setState({ coordinates: result.geoObjects.get(0).geometry.getCoordinates() }))
    }
    return (
        <div>
            <YMaps onApiAvaliable={ymaps => geocode(ymaps)}>
                <Map>
                    {!state ? null :

                        <Placemark geometry={{ coordinates: state }} />
                    }

                </Map>
            </YMaps>
        </div>
    )
}
