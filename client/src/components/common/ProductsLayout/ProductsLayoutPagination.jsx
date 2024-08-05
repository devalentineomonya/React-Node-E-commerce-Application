import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const ProductsLayoutPagination = () => {
  return (
    <div className='products-pagination-container'>
        
      <div className="pagination-item"><BiChevronLeft/></div>
      <div className="pagination-item">1</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">3</div>
      <div className="pagination-item">4</div>
      <div className="pagination-item">5</div>
      <div className="pagination-item"><BiChevronRight/></div>
    </div>
  )
}

export default ProductsLayoutPagination
