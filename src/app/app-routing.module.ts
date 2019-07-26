import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { ManagecatComponent } from './managecat/managecat.component';
import { ManagesubcatComponent } from './managesubcat/managesubcat.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { ShowcatComponent } from './showcat/showcat.component';
import { ShowsubcatComponent } from './showsubcat/showsubcat.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CartinfoComponent } from './cartinfo/cartinfo.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersummaryComponent } from './ordersummary/ordersummary.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { OrderdetailsbyuserComponent } from './orderdetailsbyuser/orderdetailsbyuser.component';
import { OrdernumbertohistoryComponent } from './ordernumbertohistory/ordernumbertohistory.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermofuseComponent } from './termofuse/termofuse.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AllordersbyadminComponent } from './allordersbyadmin/allordersbyadmin.component';
import { OrderdetailbyadminComponent } from './orderdetailbyadmin/orderdetailbyadmin.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { ContactusmsgComponent } from './contactusmsg/contactusmsg.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchinputComponent } from './searchinput/searchinput.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/sitehome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'sitehome',
    component: HomeComponent
  },
  {
    path: 'adminpanel',
    component: AdminhomeComponent
  },
  {
    path: 'changepass',
    component: ChangepassComponent
  },
  {
    path: 'searchuser',
    component: SearchuserComponent
  },
  {
    path: 'allusers',
    component: MemberlistComponent
  },
  {
    path: 'managecat',
    component: ManagecatComponent
  },
  {
    path: 'managesubcat',
    component: ManagesubcatComponent
  },
  {
    path: 'manageproducts',
    component: ManageproductsComponent
  },
  {
    path: 'showcat',
    component: ShowcatComponent
  },
  {
    path: 'showsubcat',
    component: ShowsubcatComponent
  },
  {
    path: 'showproducts',
    component: ShowproductsComponent
  },
  {
    path: 'productdetail',
    component: ProductdetailComponent
  },
  {
    path: 'cartinfo',
    component: CartinfoComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'ordersummary',
    component: OrdersummaryComponent
  },
  {
    path: 'orderdetails',
    component: OrderdetailsbyuserComponent
  },
  {
    path: 'ordernumber',
    component: OrdernumbertohistoryComponent
  },
  {
    path: 'contactus',
    component: ContactUsComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'termofuse',
    component: TermofuseComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacypolicyComponent
  },
  {
    path: 'allordersbyadmin',
    component: AllordersbyadminComponent
  },
  {
    path: 'orderdetailbyadmin',
    component: OrderdetailbyadminComponent
  },
  {
    path: 'updatestatus',
    component: UpdatestatusComponent
  },
  {
    path: 'contactusmessages',
    component: ContactusmsgComponent
  },
  {
    path: 'editprofile',
    component: EditProfileComponent
  },
  {
    path: 'queryinput',
    component: SearchinputComponent
  }
  // {
  //   path: 'error',
  //   component: ErrorpageComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
