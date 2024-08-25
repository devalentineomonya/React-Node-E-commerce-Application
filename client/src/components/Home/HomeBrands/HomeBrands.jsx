import SectionLayout from '../../common/SectionLayout/SectionLayout'
import { CategoryItem } from '../../common/Navbar/NavCategoryDropDown'
import { useSelector } from 'react-redux'

const HomeBrands = () => {

  const brands = useSelector(state => state.brand.brands)
  const products = useSelector(state => state.product.products)
  return (
 <SectionLayout title="Choose By Brand">
     <div className="category-drop-down-content">
      {
        brands?.map((brand )=>{
          const productsWithBrand = products.filter((product)=> product?.brand === brand?.name)
         return(

           <CategoryItem count={productsWithBrand?.length} image={brand?.imageUrl} name={brand?.name} brand animate key={brand?._id}/>
         ) 
        })
      }

     </div>
 </SectionLayout>
  )
}

export default HomeBrands
