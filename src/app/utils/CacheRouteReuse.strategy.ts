import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {
    
    private static ROUTE_KEY_HOME = "Home";

    private handlers: {[key: string]: DetachedRouteHandle} = {};
    
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        /*console.log("CacheRouteReuseStrategy: shouldDetach");
        console.log(route);*/
        if(this.getPath(route) === CacheRouteReuseStrategy.ROUTE_KEY_HOME){
            //console.log("return true");
            return true;
        }
        //console.log("return false");
        return false;
    }    
    
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        /*console.log("CacheRouteReuseStrategy: store");
        console.log(route);*/
        this.handlers[route.routeConfig.path] = handle;
    }
    
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        /*console.log("CacheRouteReuseStrategy: shouldAttach");
        console.log(route);*/
        if(this.getPath(route) === CacheRouteReuseStrategy.ROUTE_KEY_HOME && 
        this.handlers[route.routeConfig.path] != null){
            //console.log("return true");
            return true;
        }
        //console.log("return false");
        return false;
    }
    
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        /*console.log("CacheRouteReuseStrategy: retrieve");
        console.log(route);*/
        if(this.getPath(route) === CacheRouteReuseStrategy.ROUTE_KEY_HOME && 
        this.handlers[route.routeConfig.path] != null){
            //console.log("return handler");
            return this.handlers[route.routeConfig.path];
        }
        //console.log("return null");
        return null;
    }
    
    shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        /*console.log("CacheRouteReuseStrategy: shouldReuseRoute");
        console.log(curr);
        console.log(before);
        console.log("return " + before.routeConfig === curr.routeConfig);*/
        return before.routeConfig === curr.routeConfig;
    }

    private getPath(route: ActivatedRouteSnapshot): string {
        //console.log("CacheRouteReuseStrategy: getPath");
        if (route.routeConfig !== null && route.routeConfig.path !== null) {
            //console.log(route.routeConfig.path);
          return route.routeConfig.path;
        }
        return '';
    }

}