import Router from '@koa/router'
import { Next, ParameterizedContext } from 'koa'
import { z } from 'zod'
import { Rectangle, rectangleZodSchema, State } from './types'

const router = new Router<State>()

let rectangles: Array<Rectangle> = []

router.get('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)

  const found = rectangles.find(({ name }) => name === paramparse.data.name)
  ctx.assert(found, 404)

  ctx.status = 200
  ctx.body = found

  await next()
})

router.put('/rectangle', async (ctx: ParameterizedContext<State>, next: Next) => {
  const bodyparse = rectangleZodSchema.safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const found = rectangles.find(({ name }) => name === bodyparse.data.name)
  ctx.assert(found === undefined, 409)

  rectangles.push(bodyparse.data)

  ctx.status = 201

  await next()
})

router.delete('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)

  const found = rectangles.find(({ name }) => name === paramparse.data.name)
  ctx.assert(found, 404)

  rectangles = rectangles.filter(({ name }) => name !== paramparse.data.name)

  ctx.status = 200 // maybe 204

  await next()
})

router.patch('/rectangle/:name', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ name: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)
  const bodyparse = z.object({ width: z.number(), height: z.number() }).safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const found = rectangles.find(({ name }) => name === paramparse.data.name)
  ctx.assert(found, 404)

  rectangles = [
    ...rectangles.filter(({ name }) => name !== paramparse.data.name),
    {
      ...paramparse.data,
      ...bodyparse.data
    }
  ]

  ctx.status = 200 // maybe 204

  await next()
})

export default router
