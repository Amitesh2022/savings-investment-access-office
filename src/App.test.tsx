// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('savings and investment access office', () => {
  it('loads access reviews from the Java API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Retail investor participation barrier', owner: 'European Savings and Investment Team', status: 'Review', priority: 'High' }],
    }))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><App /></QueryClientProvider>)
    expect(await screen.findByText('Retail investor participation barrier')).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Savings and Investment Access Office' })).toBeTruthy()
  })
})
