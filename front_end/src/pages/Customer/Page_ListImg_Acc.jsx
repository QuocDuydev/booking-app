import React from "react";
import Navbars from "../../components/Customer/Layout/Navbar";
import List_Img_Acc from "../../components/Customer/List_Img_Acc";
import ScrollToTop from "../../components/Customer/Layout/ScrollTop";

export default function Show_ListImg_Acc() {
	return (
		<div>
			<Navbars />
			<ScrollToTop />
			<List_Img_Acc />
		</div>
	);
}
