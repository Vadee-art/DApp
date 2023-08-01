import SamplePic from '@/assets/img/Sample_Pic.png'
export const Artwork = () => {
  return (
    <div className="flex flex-col gap-8">
      <img src={SamplePic} alt="sample pic" className='w-full bject-contain' />
      <div className='flex flex-col text-sm font-extralight'>
        <h3 className='font-medium'>
          Hamed Jaberha
        </h3>
        <span>
          unknown
        </span>
        <span>
          Pakistan
        </span>
        <span>
          $21000
        </span>
      </div>
    </div>
  )
}