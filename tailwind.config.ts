import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: '',
    theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)',
    			xsm: 'calc(var(--radius) - 8px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-sans)',
                    ...fontFamily.sans
                ]
    		},
    		screens: {
    			'min-video-aspect': {
    				raw: '(min-aspect-ratio: 16/9)'
    			},
    			'max-video-aspect': {
    				raw: '(max-aspect-ratio: 16/9)'
    			},
    			modsm: '20rem',
    			modmd: '34rem',
    			modlg: '72rem'
    		},
    		flexBasis: {
    			'2/2': '100%',
    			'2/4': '50%',
    			'3/4': '75%',
    			'4/4': '100%',
    			'2/6': '33.333333%',
    			'3/6': '50%',
    			'4/6': '66.666667%',
    			'5/6': '83.333333%',
    			'6/6': '100%'
    		},
    		height: {
    			'1b': '7.5rem',
    			'2b': '15rem',
    			'3b': '22.5rem',
    			'4b': '30rem'
    		}
    	}
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(function containerQueries({ matchUtilities, matchVariant, theme }) {
            let values = theme('containers') ?? {};

            function parseValue(value: string) {
                let numericValue = value.match(/^(\d+\.\d+|\d+|\.\d+)\D+/)?.[1] ?? null;
                if (numericValue === null) return null;

                return parseFloat(value);
            }

            matchUtilities(
                {
                    '@container': (value, { modifier }) => {
                        return {
                            'container-type': value,
                            'container-name': modifier,
                        };
                    },
                },
                {
                    values: {
                        DEFAULT: 'size',
                        normal: 'normal',
                    },
                    modifiers: 'any',
                },
            );

            matchVariant(
                '@',
                (value = '', { modifier }) => {
                    let parsed = parseValue(value);

                    return parsed !== null
                        ? `@container ${modifier ?? ''} (min-height: ${value})`
                        : [];
                },
                {
                    values,
                    sort(aVariant, zVariant) {
                        let a = parseFloat(aVariant.value);
                        let z = parseFloat(zVariant.value);

                        if (a === null || z === null) return 0;

                        // Sort values themselves regardless of unit
                        if (a - z !== 0) return a - z;

                        let aLabel = aVariant.modifier ?? '';
                        let zLabel = zVariant.modifier ?? '';

                        // Explicitly move empty labels to the end
                        if (aLabel === '' && zLabel !== '') {
                            return 1;
                        } else if (aLabel !== '' && zLabel === '') {
                            return -1;
                        }

                        // Sort labels alphabetically in the English locale
                        // We are intentionally overriding the locale because we do not want the sort to
                        // be affected by the machine's locale (be it a developer or CI environment)
                        return aLabel.localeCompare(zLabel, 'en', { numeric: true });
                    },
                },
            );
        }),
    ],
} satisfies Config;

export default config;
