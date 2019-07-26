import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
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
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermofuseComponent } from './termofuse/termofuse.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AllordersbyadminComponent } from './allordersbyadmin/allordersbyadmin.component';
import { OrderdetailbyadminComponent } from './orderdetailbyadmin/orderdetailbyadmin.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { ContactusmsgComponent } from './contactusmsg/contactusmsg.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchinputComponent } from './searchinput/searchinput.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminhomeComponent,
    ChangepassComponent,
    SearchuserComponent,
    MemberlistComponent,
    ManagecatComponent,
    ManagesubcatComponent,
    ManageproductsComponent,
    ShowcatComponent,
    ShowsubcatComponent,
    ShowproductsComponent,
    ProductdetailComponent,
    CartinfoComponent,
    CheckoutComponent,
    OrdersummaryComponent,
    ErrorpageComponent,
    OrderdetailsbyuserComponent,
    OrdernumbertohistoryComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermofuseComponent,
    PrivacypolicyComponent,
    AllordersbyadminComponent,
    OrderdetailbyadminComponent,
    UpdatestatusComponent,
    ContactusmsgComponent,
    EditProfileComponent,
    ProfileComponent,
    SearchinputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
