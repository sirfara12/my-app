import { useRouter } from 'next/router';

type RouterOverrides = Record<string, unknown>;

export const createMockRouter = (overrides: RouterOverrides = {}) => ({
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  basePath: '',
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  ...overrides,
});

export const mockUseRouter = (overrides: RouterOverrides = {}) => {
  const mockedUseRouter = useRouter as jest.Mock;
  mockedUseRouter.mockReturnValue(createMockRouter(overrides));
};