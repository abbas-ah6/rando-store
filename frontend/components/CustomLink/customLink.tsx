'use client'

import Link from 'next/link'
import React from 'react'

const CustomLink: React.FC<TLink> = ({ href, label, className }) => {
    return (
        <Link
            href={href}
            className={`px-6 py-2 rounded-md bg-purple-700 text-white hover:bg-purple-600 ease-in-out duration-300 hover:shadow-2xl transition-all ${className || ''}`}
        >
            {label}
        </Link>
    )
}

export default CustomLink
