config.priceTag = {}
    config.priceTag.loginData = {}
        config.priceTag.loginData.URL       = "http://omega.yunli-wuli.com:9191/V1/Login"
        config.priceTag.loginData.method    = "POST"
        config.priceTag.loginData.userName  = "Test065"
        config.priceTag.loginData.password  = "ACSG065"
    config.priceTag.ledControl = {}
        config.priceTag.ledControl.URL      = "http://omega.yunli-wuli:9191.com/V2/label/led"
        config.priceTag.ledControl.method   = "PUT"
        config.priceTag.ledControl.params   = ["Authorization", "storeUuid", "mac", "color", "total", "period", "interval", "brigthness"]
    config.priceTag.getProductInformationByMacAddress = {}
        config.priceTag.getProductInformationByMacAddress.URL       = "http://omega.yunli-wuli:9191.com/V2/label/query"
        config.priceTag.getProductInformationByMacAddress.method    = "GET"
        config.priceTag.getProductInformationByMacAddress.params    = ["Authorization", "mac"]
