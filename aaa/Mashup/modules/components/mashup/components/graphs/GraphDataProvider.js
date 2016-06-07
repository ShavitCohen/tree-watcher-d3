App.factory('GraphDataProvider', ['$q', '$timeout', function($q, $timeout) {
    var mock = {
       "id":"1",
       "name":"End User Monitors",
       "classification":null,
       "layer":null,
       "ciType":null,
       "cmdbId":null,
       "status":0,
       "data":{
          "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
          "_ci_type":null,
          "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Irrelevant'></tooltipProperty></tooltip>",
          "_ack_id":null,
          "_update_id":"1::68c820b3a427e5dad56f5158a05ae33b!&!&,776644973a37ca39d9c1c526a6424bed!&!&,e7bab76f29122a35ed94a2fd8ec0002c!&!&",
          "_hi_id":false,
          "_business_impact":null,
          "_display_label":"End User Monitors",
          "_cmdb_id":"1",
          "_kpis":[

          ],
          "_id":"1",
          "_ci_icon":null,
          "_cmdb_type":"VIRTUAL_ROOT",
          "_cm_ids":[

          ],
          "_content_type":"FULL_CI",
          "_tooltip_xml":null,
          "_status":0
       },
       "children":[
          {
             "id":"1;;e7bab76f29122a35ed94a2fd8ec0002c",
             "name":"random",
             "classification":null,
             "layer":null,
             "ciType":null,
             "cmdbId":null,
             "status":-2,
             "data":{
                "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                "_ci_type":"BusinessApplication",
                "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                "_ack_id":null,
                "_update_id":"e7bab76f29122a35ed94a2fd8ec0002c::",
                "_hi_id":false,
                "_business_impact":1,
                "_display_label":"random",
                "_cmdb_id":"e7bab76f29122a35ed94a2fd8ec0002c",
                "_kpis":[
                   {
                      "status":-2,
                      "label":"Application Performance",
                      "kpiType":6,
                      "displayOrder":6,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_6",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_6",
                         "_label":"Application Performance",
                         "_status":-2,
                         "kpi_type":6,
                         "display_order":6
                      }
                   },
                   {
                      "status":-2,
                      "label":"Application Availability",
                      "kpiType":7,
                      "displayOrder":7,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_7",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_7",
                         "_label":"Application Availability",
                         "_status":-2,
                         "kpi_type":7,
                         "display_order":7
                      }
                   }
                ],
                "_id":"1;;e7bab76f29122a35ed94a2fd8ec0002c",
                "_ci_icon":"/odb/icons/logical_application/logical_application_16.gif",
                "_cmdb_type":"PHYSICAL_CI",
                "_cm_ids":[
                   "eumBPMReports4Application",
                   "eumApplicationSummary",
                   "itCIs"
                ],
                "_content_type":"FULL_CI",
                "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='random' maxLabelWidth='130' maxValueWidth='170' headerColor='#5E8DC6' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessApplication'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                "_status":-2
             },
             "children":[
                {
                   "id":"1;;e7bab76f29122a35ed94a2fd8ec0002c;;2e33acc2ec3441673df9b756f688f6ad",
                   "name":"random_status",
                   "classification":null,
                   "layer":null,
                   "ciType":null,
                   "cmdbId":null,
                   "status":-2,
                   "data":{
                      "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                      "_ci_type":"BusinessTransactionFlow",
                      "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                      "_ack_id":null,
                      "_update_id":"2e33acc2ec3441673df9b756f688f6ad::",
                      "_hi_id":false,
                      "_business_impact":1,
                      "_display_label":"random_status",
                      "_cmdb_id":"2e33acc2ec3441673df9b756f688f6ad",
                      "_kpis":[
                         {
                            "status":-2,
                            "label":"Application Performance",
                            "kpiType":6,
                            "displayOrder":6,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_6",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_6",
                               "_label":"Application Performance",
                               "_status":-2,
                               "kpi_type":6,
                               "display_order":6
                            }
                         },
                         {
                            "status":-2,
                            "label":"Application Availability",
                            "kpiType":7,
                            "displayOrder":7,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_7",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_7",
                               "_label":"Application Availability",
                               "_status":-2,
                               "kpi_type":7,
                               "display_order":7
                            }
                         }
                      ],
                      "_id":"1;;e7bab76f29122a35ed94a2fd8ec0002c;;2e33acc2ec3441673df9b756f688f6ad",
                      "_ci_icon":"/odb/icons/business_transaction_flow/business_transaction_flow_16.gif",
                      "_cmdb_type":"PHYSICAL_CI",
                      "_cm_ids":[
                         "eumBPMReports4BTF",
                         "groupMenu"
                      ],
                      "_content_type":"FULL_CI",
                      "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='random_status' maxLabelWidth='130' maxValueWidth='170' headerColor='#5E8DC6' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransactionFlow'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                      "_status":-2
                   },
                   "children":[
                      {
                         "id":"1;;e7bab76f29122a35ed94a2fd8ec0002c;;2e33acc2ec3441673df9b756f688f6ad;;4d7483a71dcc364811c28d365924e253",
                         "name":"tx_random",
                         "classification":null,
                         "layer":null,
                         "ciType":null,
                         "cmdbId":null,
                         "status":-2,
                         "data":{
                            "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                            "_ci_type":"BusinessTransaction",
                            "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                            "_ack_id":null,
                            "_update_id":"4d7483a71dcc364811c28d365924e253::",
                            "_hi_id":true,
                            "_business_impact":1,
                            "_display_label":"tx_random",
                            "_cmdb_id":"4d7483a71dcc364811c28d365924e253",
                            "_kpis":[
                               {
                                  "status":-2,
                                  "label":"Application Performance",
                                  "kpiType":6,
                                  "displayOrder":6,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_6",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_6",
                                     "_label":"Application Performance",
                                     "_status":-2,
                                     "kpi_type":6,
                                     "display_order":6
                                  }
                               },
                               {
                                  "status":-2,
                                  "label":"Application Availability",
                                  "kpiType":7,
                                  "displayOrder":7,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_7",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#BCD3F0' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_7",
                                     "_label":"Application Availability",
                                     "_status":-2,
                                     "kpi_type":7,
                                     "display_order":7
                                  }
                               }
                            ],
                            "_id":"1;;e7bab76f29122a35ed94a2fd8ec0002c;;2e33acc2ec3441673df9b756f688f6ad;;4d7483a71dcc364811c28d365924e253",
                            "_ci_icon":"/odb/icons/business_transaction/business_transaction_16.gif",
                            "_cmdb_type":"PHYSICAL_CI",
                            "_cm_ids":[
                               "eumBPMReports4Transaction",
                               "itCIs"
                            ],
                            "_content_type":"FULL_CI",
                            "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='tx_random' maxLabelWidth='130' maxValueWidth='170' headerColor='#5E8DC6' borderColor='#5E8DC6'><tooltipProperty key='Status' value='Not up to date'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransaction'></tooltipProperty><tooltipProperty key='Last Status Change' value='10/23/2015 5:20 PM'></tooltipProperty></tooltip>",
                            "_status":-2
                         },
                         "children":[

                         ],
                         "dimensions":null,
                         "lastUpdate":0
                      }
                   ],
                   "dimensions":null,
                   "lastUpdate":0
                }
             ],
             "dimensions":null,
             "lastUpdate":0
          },
          {
             "id":"1;;776644973a37ca39d9c1c526a6424bed",
             "name":"RYG",
             "classification":null,
             "layer":null,
             "ciType":null,
             "cmdbId":null,
             "status":0,
             "data":{
                "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                "_ci_type":"BusinessApplication",
                "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                "_ack_id":null,
                "_update_id":"776644973a37ca39d9c1c526a6424bed::",
                "_hi_id":false,
                "_business_impact":1,
                "_display_label":"RYG",
                "_cmdb_id":"776644973a37ca39d9c1c526a6424bed",
                "_kpis":[
                   {
                      "status":0,
                      "label":"Application Performance",
                      "kpiType":6,
                      "displayOrder":6,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_6",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_6",
                         "_label":"Application Performance",
                         "_status":0,
                         "kpi_type":6,
                         "display_order":6
                      }
                   },
                   {
                      "status":20,
                      "label":"Application Availability",
                      "kpiType":7,
                      "displayOrder":7,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_7",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_7",
                         "_label":"Application Availability",
                         "_status":20,
                         "kpi_type":7,
                         "display_order":7
                      }
                   }
                ],
                "_id":"1;;776644973a37ca39d9c1c526a6424bed",
                "_ci_icon":"/odb/icons/logical_application/logical_application_16.gif",
                "_cmdb_type":"PHYSICAL_CI",
                "_cm_ids":[
                   "eumBPMReports4Application",
                   "eumApplicationSummary",
                   "itCIs"
                ],
                "_content_type":"FULL_CI",
                "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='RYG' maxLabelWidth='130' maxValueWidth='170' headerColor='#DD0000' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessApplication'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                "_status":0
             },
             "children":[
                {
                   "id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96",
                   "name":"R_Y_G",
                   "classification":null,
                   "layer":null,
                   "ciType":null,
                   "cmdbId":null,
                   "status":0,
                   "data":{
                      "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                      "_ci_type":"BusinessTransactionFlow",
                      "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                      "_ack_id":null,
                      "_update_id":"9c3717d152e075a731af73cb2cfbec96::",
                      "_hi_id":false,
                      "_business_impact":1,
                      "_display_label":"R_Y_G",
                      "_cmdb_id":"9c3717d152e075a731af73cb2cfbec96",
                      "_kpis":[
                         {
                            "status":0,
                            "label":"Application Performance",
                            "kpiType":6,
                            "displayOrder":6,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_6",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_6",
                               "_label":"Application Performance",
                               "_status":0,
                               "kpi_type":6,
                               "display_order":6
                            }
                         },
                         {
                            "status":20,
                            "label":"Application Availability",
                            "kpiType":7,
                            "displayOrder":7,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_7",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_7",
                               "_label":"Application Availability",
                               "_status":20,
                               "kpi_type":7,
                               "display_order":7
                            }
                         }
                      ],
                      "_id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96",
                      "_ci_icon":"/odb/icons/business_transaction_flow/business_transaction_flow_16.gif",
                      "_cmdb_type":"PHYSICAL_CI",
                      "_cm_ids":[
                         "eumBPMReports4BTF",
                         "groupMenu"
                      ],
                      "_content_type":"FULL_CI",
                      "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='R_Y_G' maxLabelWidth='130' maxValueWidth='170' headerColor='#DD0000' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransactionFlow'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "_status":0
                   },
                   "children":[
                      {
                         "id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;e6e409fdd27a18da1cbb22c8f2cb837f",
                         "name":"Green",
                         "classification":null,
                         "layer":null,
                         "ciType":null,
                         "cmdbId":null,
                         "status":20,
                         "data":{
                            "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                            "_ci_type":"BusinessTransaction",
                            "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                            "_ack_id":null,
                            "_update_id":"e6e409fdd27a18da1cbb22c8f2cb837f::",
                            "_hi_id":true,
                            "_business_impact":1,
                            "_display_label":"Green",
                            "_cmdb_id":"e6e409fdd27a18da1cbb22c8f2cb837f",
                            "_kpis":[
                               {
                                  "status":20,
                                  "label":"Unassigned Events",
                                  "kpiType":10005,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='2'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10005",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='2'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10005",
                                     "_label":"Unassigned Events",
                                     "_status":20,
                                     "kpi_type":10005,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Unresolved Events",
                                  "kpiType":10004,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='2'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10004",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='2'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10004",
                                     "_label":"Unresolved Events",
                                     "_status":20,
                                     "kpi_type":10004,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Performance",
                                  "kpiType":6,
                                  "displayOrder":6,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='3.01'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_6",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='3.01'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_6",
                                     "_label":"Application Performance",
                                     "_status":20,
                                     "kpi_type":6,
                                     "display_order":6
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Availability",
                                  "kpiType":7,
                                  "displayOrder":7,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_7",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_7",
                                     "_label":"Application Availability",
                                     "_status":20,
                                     "kpi_type":7,
                                     "display_order":7
                                  }
                               }
                            ],
                            "_id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;e6e409fdd27a18da1cbb22c8f2cb837f",
                            "_ci_icon":"/odb/icons/business_transaction/business_transaction_16.gif",
                            "_cmdb_type":"PHYSICAL_CI",
                            "_cm_ids":[
                               "eumBPMReports4Transaction",
                               "itCIs"
                            ],
                            "_content_type":"FULL_CI",
                            "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Green' maxLabelWidth='130' maxValueWidth='170' headerColor='#78B24A' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransaction'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty></tooltip>",
                            "_status":20
                         },
                         "children":[

                         ],
                         "dimensions":null,
                         "lastUpdate":0
                      },
                      {
                         "id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;1e1104d0b629aaf9b235d5cf3d5fbae9",
                         "name":"Red",
                         "classification":null,
                         "layer":null,
                         "ciType":null,
                         "cmdbId":null,
                         "status":0,
                         "data":{
                            "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                            "_ci_type":"BusinessTransaction",
                            "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                            "_ack_id":null,
                            "_update_id":"1e1104d0b629aaf9b235d5cf3d5fbae9::",
                            "_hi_id":true,
                            "_business_impact":1,
                            "_display_label":"Red",
                            "_cmdb_id":"1e1104d0b629aaf9b235d5cf3d5fbae9",
                            "_kpis":[
                               {
                                  "status":0,
                                  "label":"Unassigned Events",
                                  "kpiType":10005,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10005",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10005",
                                     "_label":"Unassigned Events",
                                     "_status":0,
                                     "kpi_type":10005,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":0,
                                  "label":"Unresolved Events",
                                  "kpiType":10004,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10004",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10004",
                                     "_label":"Unresolved Events",
                                     "_status":0,
                                     "kpi_type":10004,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":0,
                                  "label":"Application Performance",
                                  "kpiType":6,
                                  "displayOrder":6,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='16.037'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_6",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FE7F7F' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='16.037'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_6",
                                     "_label":"Application Performance",
                                     "_status":0,
                                     "kpi_type":6,
                                     "display_order":6
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Availability",
                                  "kpiType":7,
                                  "displayOrder":7,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_7",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_7",
                                     "_label":"Application Availability",
                                     "_status":20,
                                     "kpi_type":7,
                                     "display_order":7
                                  }
                               }
                            ],
                            "_id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;1e1104d0b629aaf9b235d5cf3d5fbae9",
                            "_ci_icon":"/odb/icons/business_transaction/business_transaction_16.gif",
                            "_cmdb_type":"PHYSICAL_CI",
                            "_cm_ids":[
                               "eumBPMReports4Transaction",
                               "itCIs"
                            ],
                            "_content_type":"FULL_CI",
                            "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Red' maxLabelWidth='130' maxValueWidth='170' headerColor='#DD0000' borderColor='#DD0000'><tooltipProperty key='Status' value='Critical'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransaction'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty></tooltip>",
                            "_status":0
                         },
                         "children":[

                         ],
                         "dimensions":null,
                         "lastUpdate":0
                      },
                      {
                         "id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;5d09db838da73305a8ce48cf6d134cb8",
                         "name":"Yellow",
                         "classification":null,
                         "layer":null,
                         "ciType":null,
                         "cmdbId":null,
                         "status":10,
                         "data":{
                            "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                            "_ci_type":"BusinessTransaction",
                            "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                            "_ack_id":null,
                            "_update_id":"5d09db838da73305a8ce48cf6d134cb8::",
                            "_hi_id":true,
                            "_business_impact":1,
                            "_display_label":"Yellow",
                            "_cmdb_id":"5d09db838da73305a8ce48cf6d134cb8",
                            "_kpis":[
                               {
                                  "status":10,
                                  "label":"Unassigned Events",
                                  "kpiType":10005,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10005",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10005",
                                     "_label":"Unassigned Events",
                                     "_status":10,
                                     "kpi_type":10005,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":10,
                                  "label":"Unresolved Events",
                                  "kpiType":10004,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10004",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty><tooltipProperty key='Value' value='1'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10004",
                                     "_label":"Unresolved Events",
                                     "_status":10,
                                     "kpi_type":10004,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":10,
                                  "label":"Application Performance",
                                  "kpiType":6,
                                  "displayOrder":6,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='10.023'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_6",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#FFEEA9' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='10.023'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_6",
                                     "_label":"Application Performance",
                                     "_status":10,
                                     "kpi_type":6,
                                     "display_order":6
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Availability",
                                  "kpiType":7,
                                  "displayOrder":7,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_7",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_7",
                                     "_label":"Application Availability",
                                     "_status":20,
                                     "kpi_type":7,
                                     "display_order":7
                                  }
                               }
                            ],
                            "_id":"1;;776644973a37ca39d9c1c526a6424bed;;9c3717d152e075a731af73cb2cfbec96;;5d09db838da73305a8ce48cf6d134cb8",
                            "_ci_icon":"/odb/icons/business_transaction/business_transaction_16.gif",
                            "_cmdb_type":"PHYSICAL_CI",
                            "_cm_ids":[
                               "eumBPMReports4Transaction",
                               "itCIs"
                            ],
                            "_content_type":"FULL_CI",
                            "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Yellow' maxLabelWidth='130' maxValueWidth='170' headerColor='#E0C135' borderColor='#E0C135'><tooltipProperty key='Status' value='Minor'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransaction'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:29 PM'></tooltipProperty></tooltip>",
                            "_status":10
                         },
                         "children":[

                         ],
                         "dimensions":null,
                         "lastUpdate":0
                      }
                   ],
                   "dimensions":null,
                   "lastUpdate":0
                }
             ],
             "dimensions":null,
             "lastUpdate":0
          },
          {
             "id":"1;;68c820b3a427e5dad56f5158a05ae33b",
             "name":"testing",
             "classification":null,
             "layer":null,
             "ciType":null,
             "cmdbId":null,
             "status":20,
             "data":{
                "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                "_ci_type":"BusinessApplication",
                "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                "_ack_id":null,
                "_update_id":"68c820b3a427e5dad56f5158a05ae33b::",
                "_hi_id":false,
                "_business_impact":1,
                "_display_label":"testing",
                "_cmdb_id":"68c820b3a427e5dad56f5158a05ae33b",
                "_kpis":[
                   {
                      "status":20,
                      "label":"Application Performance",
                      "kpiType":6,
                      "displayOrder":6,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_6",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_6",
                         "_label":"Application Performance",
                         "_status":20,
                         "kpi_type":6,
                         "display_order":6
                      }
                   },
                   {
                      "status":20,
                      "label":"Application Availability",
                      "kpiType":7,
                      "displayOrder":7,
                      "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "empty":false,
                      "id":"_kpi_7",
                      "propertiesMap":{
                         "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                         "_id":"_kpi_7",
                         "_label":"Application Availability",
                         "_status":20,
                         "kpi_type":7,
                         "display_order":7
                      }
                   }
                ],
                "_id":"1;;68c820b3a427e5dad56f5158a05ae33b",
                "_ci_icon":"/odb/icons/logical_application/logical_application_16.gif",
                "_cmdb_type":"PHYSICAL_CI",
                "_cm_ids":[
                   "eumBPMReports4Application",
                   "eumApplicationSummary",
                   "itCIs"
                ],
                "_content_type":"FULL_CI",
                "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='testing' maxLabelWidth='130' maxValueWidth='170' headerColor='#78B24A' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessApplication'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                "_status":20
             },
             "children":[
                {
                   "id":"1;;68c820b3a427e5dad56f5158a05ae33b;;9b0fa059c8551c0bd232c73ea9763c86",
                   "name":"tx_ok",
                   "classification":null,
                   "layer":null,
                   "ciType":null,
                   "cmdbId":null,
                   "status":20,
                   "data":{
                      "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                      "_ci_type":"BusinessTransactionFlow",
                      "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                      "_ack_id":null,
                      "_update_id":"9b0fa059c8551c0bd232c73ea9763c86::",
                      "_hi_id":false,
                      "_business_impact":1,
                      "_display_label":"tx_ok",
                      "_cmdb_id":"9b0fa059c8551c0bd232c73ea9763c86",
                      "_kpis":[
                         {
                            "status":20,
                            "label":"Application Performance",
                            "kpiType":6,
                            "displayOrder":6,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_6",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_6",
                               "_label":"Application Performance",
                               "_status":20,
                               "kpi_type":6,
                               "display_order":6
                            }
                         },
                         {
                            "status":20,
                            "label":"Application Availability",
                            "kpiType":7,
                            "displayOrder":7,
                            "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                            "empty":false,
                            "id":"_kpi_7",
                            "propertiesMap":{
                               "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                               "_id":"_kpi_7",
                               "_label":"Application Availability",
                               "_status":20,
                               "kpi_type":7,
                               "display_order":7
                            }
                         }
                      ],
                      "_id":"1;;68c820b3a427e5dad56f5158a05ae33b;;9b0fa059c8551c0bd232c73ea9763c86",
                      "_ci_icon":"/odb/icons/business_transaction_flow/business_transaction_flow_16.gif",
                      "_cmdb_type":"PHYSICAL_CI",
                      "_cm_ids":[
                         "eumBPMReports4BTF",
                         "groupMenu"
                      ],
                      "_content_type":"FULL_CI",
                      "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='tx_ok' maxLabelWidth='130' maxValueWidth='170' headerColor='#78B24A' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransactionFlow'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                      "_status":20
                   },
                   "children":[
                      {
                         "id":"1;;68c820b3a427e5dad56f5158a05ae33b;;9b0fa059c8551c0bd232c73ea9763c86;;6e6412a88728126ba2c12ad1964c07e1",
                         "name":"ok",
                         "classification":null,
                         "layer":null,
                         "ciType":null,
                         "cmdbId":null,
                         "status":20,
                         "data":{
                            "_ack_tooltip":"<tooltip titleDescription='Acknowledgement' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='' value='The acknowledgment for this CI is not set.&lt;BR&gt;Click to set this acknowledgment.&lt;BR&gt;Note: You can see the CI acknowledgment details/history using context menu.'></tooltipProperty></tooltip>",
                            "_ci_type":"BusinessTransaction",
                            "_business_impact_tooltip":"<tooltip titleDescription='Business Impact' maxLabelWidth='100' maxValueWidth='100' borderColor='#eeeeee'><tooltipProperty key='Impact' value='Low'></tooltipProperty></tooltip>",
                            "_ack_id":null,
                            "_update_id":"6e6412a88728126ba2c12ad1964c07e1::",
                            "_hi_id":true,
                            "_business_impact":1,
                            "_display_label":"ok",
                            "_cmdb_id":"6e6412a88728126ba2c12ad1964c07e1",
                            "_kpis":[
                               {
                                  "status":20,
                                  "label":"Unassigned Events",
                                  "kpiType":10005,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='7/20/2015 1:32 PM'></tooltipProperty><tooltipProperty key='Value' value='6'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10005",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unassigned Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='7/20/2015 1:32 PM'></tooltipProperty><tooltipProperty key='Value' value='6'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10005",
                                     "_label":"Unassigned Events",
                                     "_status":20,
                                     "kpi_type":10005,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Unresolved Events",
                                  "kpiType":10004,
                                  "displayOrder":0,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='7/20/2015 1:32 PM'></tooltipProperty><tooltipProperty key='Value' value='6'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_10004",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Unresolved Events' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='7/20/2015 1:32 PM'></tooltipProperty><tooltipProperty key='Value' value='6'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_10004",
                                     "_label":"Unresolved Events",
                                     "_status":20,
                                     "kpi_type":10004,
                                     "display_order":0
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Performance",
                                  "kpiType":6,
                                  "displayOrder":6,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='0.001'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_6",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Performance' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='0.001'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_6",
                                     "_label":"Application Performance",
                                     "_status":20,
                                     "kpi_type":6,
                                     "display_order":6
                                  }
                               },
                               {
                                  "status":20,
                                  "label":"Application Availability",
                                  "kpiType":7,
                                  "displayOrder":7,
                                  "tooltipXML":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                  "empty":false,
                                  "id":"_kpi_7",
                                  "propertiesMap":{
                                     "tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='Application Availability' maxLabelWidth='130' maxValueWidth='170' headerColor='#C9E7B2' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Business Rule' value='Worst Status Rule'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty><tooltipProperty key='Value' value='100'></tooltipProperty></tooltip>",
                                     "_id":"_kpi_7",
                                     "_label":"Application Availability",
                                     "_status":20,
                                     "kpi_type":7,
                                     "display_order":7
                                  }
                               }
                            ],
                            "_id":"1;;68c820b3a427e5dad56f5158a05ae33b;;9b0fa059c8551c0bd232c73ea9763c86;;6e6412a88728126ba2c12ad1964c07e1",
                            "_ci_icon":"/odb/icons/business_transaction/business_transaction_16.gif",
                            "_cmdb_type":"PHYSICAL_CI",
                            "_cm_ids":[
                               "eumBPMReports4Transaction",
                               "itCIs"
                            ],
                            "_content_type":"FULL_CI",
                            "_tooltip_xml":"<tooltip titleDescription='Details' titleDescriptionLabel='ok' maxLabelWidth='130' maxValueWidth='170' headerColor='#78B24A' borderColor='#78B24A'><tooltipProperty key='Status' value='OK'></tooltipProperty><tooltipProperty key='Class Type' value='BusinessTransaction'></tooltipProperty><tooltipProperty key='Last Status Change' value='11/4/2015 5:28 PM'></tooltipProperty></tooltip>",
                            "_status":20
                         },
                         "children":[

                         ],
                         "dimensions":null,
                         "lastUpdate":0
                      }
                   ],
                   "dimensions":null,
                   "lastUpdate":0
                }
             ],
             "dimensions":null,
             "lastUpdate":0
          }
       ],
       "dimensions":null,
       "lastUpdate":0
    };

    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve(mock);
    }, 30);

    return deferred.promise;
}]);
