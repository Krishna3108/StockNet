# StockNet

# API
> GET
- Single Stock data of an index :                   '/api/smindexes/\<str:stocks\>/<int:id>'
- Total Stock data of an index :                    '/api/smindexes/\<str:stocks\>'
- Single Stock data of a company :                  '/api/companies/\<str:company\>/<int:id>'
- Total Stock data of a company :                   '/api/companies/\<str:company\>'
- Single User Data :                                '/api/users/\<int:id\>'
- Total User Data :                                 '/api/users' 

>PUT
- Register a User :                                 '/api/users'

#### Names of Stock Indexes for api (\<str:stocks\>)
- NSE (Nifty)
- BSE (Sensex)

#### Names of Companies for api (\<str:company\>)
- Tatasteel.NS
- Reliance.NS
- Eichermot.NS
- Cipla.NS
- Ashokley.NS
