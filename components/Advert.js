import React, { useState } from 'react'
import '../static/style/components/Advert.less'
const backgroundList = [
  'img/frog.jpg',
  'img/avadoc.jpg',
  'img/ak.png'
]
const Advert = () => {
  const [background, setBackground] = useState(backgroundList[0])

  return (
    <div className="ad-div comm-box">
      <div className='tuodan'>2020年,脱单,指日可待</div>
      {
        backgroundList.map((item, index) => (
          <div key={item}><img src={item} width="100%"/></div>
        ))
      }<style global jsx>{`
          body {
              background-image: url(img/guns.jpg);
              background-repeat:no-repeat ;
              background-size:100% 100%; 
              background-attachment: fixed;
          }
          .tuodan{
            box-shadow: 0px 2px 3px 0px #a3d900;
            text-align:center;
            color:#ff8936;
            position: relative;
            margin-bottom: 10px !important;
          }
      `}</style>
    </div>
  )
}

export default Advert
