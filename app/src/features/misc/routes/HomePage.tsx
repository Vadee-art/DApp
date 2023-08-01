import {register} from 'swiper/element/bundle'
import SamplePic from '@/assets/img/Sample_Pic.png'

register();

export const HomePage = () => {
  return (
    <swiper-container slides-per-view="1" loop={true} navigation pagination>
      <swiper-slide>
        <div className='absolute top-16 left-16 z-10 flex flex-col items-start justify-start text-white [&>span]:leading-tight'>
          <span className='text-[21px] font-extralight'> VADEE Collection </span>
          <span className='text-[30px] font-normal'> Shadi Ghadirian </span>
          <span className='text-[40px] font-normal'> Qajar Series </span>
        </div>
        <img src={SamplePic} alt="sample pic" className='w-full bject-contain' />
      </swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
    </swiper-container>
  )

}