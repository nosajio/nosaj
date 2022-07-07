import { Request, Response } from 'express';
import { type JsonObject } from 'type-fest';
import { pool } from '../db';

type Stats = 'view' | 'read' | 'error';

interface StatPayload {
  uri?: string;
  ip?: string;
  token?: string;
  payload?: JsonObject;
}

export async function handlerStat(
  type: Stats,
  req: Request,
  res: Response,
  payload?: JsonObject,
) {
  // Unwrap info from express request and response
  const ip = req.ip;
  const uri = req.path;
  const token = res.get('x-nosid');
  await saveStat(type, { ip, uri, token, payload: payload ?? {} });
}

export async function saveStat(type: Stats, o: StatPayload) {
  try {
    await pool.query(
      'insert into nosaj.stats (stat, uri, ip_address, token, payload) values ($1, $2, $3, $4, $5)',
      [type, o.uri, o.ip, o.token, o.payload || {}],
    );
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
