import {perfume} from './perfumes'
import {subCategory} from './sub-category'
import {news} from './news'
import {brand} from './brand'
import {collections} from './collections'
import {mainPerfume} from './main-perfume'
import newsPage from './news-page'
import {homePage} from './home-page'
import notes from './notes'
import {tableBlock} from './custom/table-block'
import {termsOfUse} from './terms-of-use'
import {cookiesPolicy} from './cookies-policy'
import {privacyPolicy} from './privacy-policy'
import { twoColumnTable } from './custom/two-column-table'
import { fileBlock } from './custom/file-block'
import { mensPerfumePage } from './mens-perfume-page'
import { womensPerfumePage } from './womens-perfume-page'
import { navbar } from './navbar'

export const schemaTypes = [
  fileBlock,
  tableBlock,
  twoColumnTable,
  homePage,
  brand,
  newsPage,
  navbar,
  mensPerfumePage,
  womensPerfumePage,
  termsOfUse,
  privacyPolicy,
  cookiesPolicy,
  perfume,
  mainPerfume,
  collections,
  news,
  notes,
  subCategory,
]
