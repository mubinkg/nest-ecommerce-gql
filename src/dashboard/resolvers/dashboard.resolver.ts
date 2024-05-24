import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard } from '../entities/dashboard.entity';
import { CreateDashboardInput } from '../dto/create-dashboard.input';
import { UpdateDashboardInput } from '../dto/update-dashboard.input';
import { DashboardTopContent } from '../dto/dashboard-top-content.dto';
import { ProductDashboardServic } from 'src/products/services/product-dahsboard.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { DashboardRatingService } from 'src/ratings/services/dashboard-rating.service';
import { CustomerDashboardService } from 'src/customers/services/customer-dashboard.service';
import { OrderDashboardServie } from 'src/orders/service/order-dashboard.service';
import { CategoryWiseProduct } from '../dto/category-wise-product.dto';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly productDashboardService:ProductDashboardServic,
    private readonly dashboardRatingService:DashboardRatingService,
    private readonly customerDashboardService:CustomerDashboardService,
    private readonly orderDashboardService:OrderDashboardServie
  ) {}

  @Query(()=>DashboardTopContent, {nullable:true})
  @UseGuards(GqlAuthGuard)
  async dashboardTopContent(
    @CurrentUser('user') user:any
  ){
    try{
      const totalProduct = await this.productDashboardService.getSellerProduct(user.userId)
      const {total:totalRating,count:rating} = await this.dashboardRatingService.getRatingValues()
      const totalBalance = await this.customerDashboardService.getTotalWalletAmount()
      const totalOrder = await this.orderDashboardService.getSellerOrderCount(user.userId)
      return {
        totalProduct,
        totalRating,
        rating,
        totalBalance,
        totalOrder
      }
    }
    catch(err){
      throw err;
    }
  }

  @Query(()=>[CategoryWiseProduct], {nullable:true})
  @UseGuards(GqlAuthGuard)
  async sellerCategoryWiseProduct(
    @CurrentUser('user') user:any
  ){
    try{
      return await this.productDashboardService.getSellerCategoryWiseProducts(user?.userId)
    }
    catch(err){
      throw err;
    }
  }
}
