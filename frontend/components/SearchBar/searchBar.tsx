import { Search, X, } from 'lucide-react'
import React from 'react'

export const SearchInput: React.FC<TSearchBarProps> = ({ value, onChange, handleSearch, onClearSearch }) => {
    return (
        <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
            <input
                type='text'
                placeholder='Search...'
                className='w-full text-xs bg-transparent py-[11px] outline-none'
                value={value}
                onChange={onChange}
            />
            {value && (
                <X
                    className={`text-xl cursor-pointer hover:text-red-500/50 ease-in-out transition-colors duration-500 mr-2 ${value ? "text-red-500" : "text-slate-500"}`}
                    onClick={onClearSearch} />
            )}
            <Search
                className={`cursor-pointer hover:text-purple-700 ease-in-out transition-colors duration-500 
                    ${value ? "text-purple-700" : "text-slate-400"}`}
                onClick={handleSearch}
            />
        </div>
    )
}
