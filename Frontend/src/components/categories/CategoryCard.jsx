import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const CategoryCard = ({
    image,
    title,
    description,
    count
}) => {


return (

<motion.div

whileHover={{
    y:-10
}}

className="
bg-white
rounded-3xl
overflow-hidden
shadow-lg
hover:shadow-2xl
transition
"


>


<div className="overflow-hidden">

<img

src={image}

alt={title}

className="
w-full
h-64
object-cover
hover:scale-110
transition
duration-500
"

/>

</div>



<div className="p-6">


<h3

className="
text-2xl
font-bold
text-[#6B6D43]
"

>

{title}

</h3>


<p

className="
text-gray-500
mt-3
"

>

{description}

</p>



<div
className="
flex
justify-between
items-center
mt-6
"
>


<span

className="
text-[#CF7D65]
font-semibold
"

>

{count} Products

</span>



<Link

to="/cakes"

className="
bg-[#CF7D65]
text-white
px-5
py-2
rounded-full
hover:bg-[#b76650]
transition
"

>

View

</Link>


</div>


</div>


</motion.div>


);


};


export default CategoryCard;