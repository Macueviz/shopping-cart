import { useId } from 'react';
import { useFilters } from '../hooks/useFilters.js';
import './Filters.css'

export function Filters() {

    const { filters, setFilters } = useFilters();

    const minPriceFilteredId = useId();
    const categoryFilteredId = useId();

    const handleChangeMinPrice = (e) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }));
    }

    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilteredId}>Min Price</label>
                <input
                    type='range'
                    id={minPriceFilteredId}
                    min='0'
                    max='2000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilteredId}>Categoría</label>
                <select id={categoryFilteredId} onChange={handleChangeCategory}>
                    <option value='All' >Todas</option>
                    <option value='laptops'>Portátiles</option>
                    <option value='smartphones'>Móviles</option>
                </select>
            </div>
        </section>
    )
}