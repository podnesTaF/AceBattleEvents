import React from 'react'
import {Image} from 'react-native'

const LogoTitle = (props: any) => {
    return <Image
    style={{ height: 25, width: 280, objectFit: "contain"}}
    source={{uri: 'https://storage.googleapis.com/abe_cloud_storage/image/large/dbd73a85-bb5c-484d-a05c-8cb73d5b55cb.png'}}
    alt='logo'
  />
}

export default LogoTitle