import CustomLink from '@/components/CustomLink/customLink';
import Image from 'next/image';
import React from 'react'

const NotFound = () => {
    return (
        <div className='container mx-auto py-[60px] px-[30px] flex justify-center items-center flex-col text-center w-full'>
            <Image
                src={'/images/not-found.svg'}
                alt='Not Found Image'
                width={420}
                height={420}
            />
            <div className='flex justify-center items-center'>
                <CustomLink
                    href='/'
                    label='Back to Home Page'
                />
            </div>
        </div>
    )
}

export default NotFound;
