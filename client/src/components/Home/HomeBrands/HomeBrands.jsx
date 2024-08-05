import SectionLayout from '../../common/SectionLayout/SectionLayout'
import { CategoryItem } from '../../common/Navbar/NavCategoryDropDown'
import testImage from "../../../assets/images/63e8c4e560afc2c49da53521_brand (3)-min.png"

const HomeBrands = () => {
  return (
 <SectionLayout title="Choose By Brand">
     <div className="category-drop-down-content">
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
    <CategoryItem count={20} image={testImage} name="Staple" brand/>
     </div>
 </SectionLayout>
  )
}

export default HomeBrands
