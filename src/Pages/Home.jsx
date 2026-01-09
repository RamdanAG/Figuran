import React from 'react'
import Header from '../components/Header'
import FigureGallery from '../components/FigureScroll'


const figuresData = [
  {
    title: 'Le Malin',
    subtitle: "'Listless Lapin' - AZUR LANE",
    date: 'Jan',
    sculptor: 'jarel',
    painter: 'Emi Hoshino',
    image: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=200&q=80'
  },
  {
    title: 'Aoba Minami',
    subtitle: "'Summer Memories' - ORIGINAL",
    date: 'Feb',
    sculptor: 'Takeshi Nakamura',
    painter: 'Yuki Tanaka',
    image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=200&q=80'
  },
  {
    title: 'Katsuragi',
    subtitle: "'Elegant Warrior' - KANTAI COLLECTION",
    date: 'Mar',
    sculptor: 'Akira Sato',
    painter: 'Mei Watanabe',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&q=80'
  },
  {
    title: 'Sakura Miku',
    subtitle: "'Spring Blossom' - VOCALOID",
    date: 'Apr',
    sculptor: 'Hiroshi Yamada',
    painter: 'Sakura Kimura',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80'
  },
  {
    title: 'Rem',
    subtitle: "'Moonlit Night' - RE:ZERO",
    date: 'May',
    sculptor: 'Kenji Ito',
    painter: 'Aoi Suzuki',
    image: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1920&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=200&q=80'
  }
]

export const Home = () => {
  return (
    <div className='app'>
        <Header/>
        <FigureGallery figures={figuresData} />
    </div>
  )
}
