import {neon,neonConfig} from '@neondatabase/serverless'
import { drizzle} from 'drizzle-orm/neon-http'

neonConfig.fetchConnectionCache = true

if(!process.env.NANO_CONNECTION){
    throw new Error('database url  notfound')
}
// set up connection 
const sql = neon(process.env.NANO_CONNECTION)
//creat schema of db
export const db =drizzle(sql)