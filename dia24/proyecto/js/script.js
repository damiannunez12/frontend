       document.addEventListener('DOMContentLoaded', () => {
            const menuBtn = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            const mobileLinks = mobileMenu.querySelectorAll('a');

            const toggleMenu = () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                if (isHidden) {
                    openMenu();
                } else {
                    closeMenu();
                }
            };

            const openMenu = () => {
                mobileMenu.classList.remove('hidden');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                menuBtn.setAttribute('aria-expanded', 'true');
            };

            const closeMenu = () => {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            };

            menuBtn.addEventListener('click', toggleMenu);

            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
            });
        });

        /**
 * DevStudio PY - Cotizador Interactivo
 * @description Manejo del cálculo dinámico del presupuesto basado en data-attributes.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selectores del Cotizador
    const formCotizador = document.getElementById('form-cotizador');
    const totalDisplay = document.getElementById('total-cotizacion');

    // 2. Formateador de Moneda Local (Paraguay - Guaraníes sin decimales)
    const formatearGuaranies = (valor) => {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(valor).replace('PYG', 'Gs.'); // Reemplazo limpio del ISO por el símbolo local
    };

    // 3. Función Principal de Cálculo
    const calcularTotal = () => {
        if (!formCotizador || !totalDisplay) return;

        let acumulado = 0;

        // Obtener el plan base seleccionado
        const planSeleccionado = formCotizador.querySelector('input[name="plan-base"]:checked');
        
        // Validación de Plan Requerido
        if (!planSeleccionado) {
            totalDisplay.textContent = "Seleccioná un plan para comenzar";
            totalDisplay.classList.add('text-sm', 'text-amber-500'); // Estilos de advertencia temporales
            return;
        } else {
            // Limpiar clases de advertencia si el plan es válido
            totalDisplay.className = "text-3xl sm:text-4xl font-black text-white tracking-tight";
        }

        // Sumar el precio del plan base (parseo seguro a base 10)
        acumulado += parseInt(planSeleccionado.getAttribute('data-precio'), 10) || 0;

        // Obtener y sumar todos los checkboxes adicionales que estén marcados
        const extrasMarcados = formCotizador.querySelectorAll('input[type="checkbox"]:checked');
        extrasMarcados.forEach(extra => {
            acumulado += parseInt(extra.getAttribute('data-precio'), 10) || 0;
        });

        // Renderizar el total formateado en el DOM
        totalDisplay.textContent = formatearGuaranies(acumulado);
    };

    // 4. Asignación de Listeners mediante Event Delegation
    // Escuchamos el evento 'change' en todo el formulario, lo que captura cualquier click en radios o checkboxes de forma eficiente.
    if (formCotizador) {
        formCotizador.addEventListener('change', calcularTotal);
        
        // Ejecución inicial para calcular el total por defecto (Landing Page precargado)
        calcularTotal();
    }
});