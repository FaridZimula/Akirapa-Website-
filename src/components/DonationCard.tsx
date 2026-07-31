import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DonationCardProps {
    className?: string;
    variant?: "default" | "landscape";
    logoSrc?: string;
    providerName: string;
    accountName: string;
    accountNumber: string;
    colorClass?: string; // e.g. "bg-primary" or "bg-red-600"
}

const DonationCard = ({
    className = "",
    variant = "default",
    logoSrc = "/stanbic-logo.png",
    providerName = "Stanbic Bank",
    accountName = "Account Number",
    accountNumber = "9030025735322",
    colorClass = "bg-primary",
}: DonationCardProps) => {
    const { toast } = useToast();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountNumber);
        toast({
            title: "Copied!",
            description: `${accountName} copied to clipboard.`,
        });
    };

    if (variant === "landscape") {
        return (
            <div
                className={`bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-4 sm:gap-6 ${className}`}
            >
                <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full sm:w-auto min-w-0">
                    <div className="h-16 sm:h-24 w-24 shrink-0 flex items-center justify-center bg-white rounded-lg p-2">
                        <img
                            src={logoSrc}
                            alt={`${providerName} Logo`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.parentElement!.innerText = providerName[0];
                                target.parentElement!.className =
                                    "text-2xl font-bold text-gray-400 flex items-center justify-center h-full w-full bg-white rounded-lg";
                            }}
                        />
                    </div>

                    <div className="space-y-1 text-left block min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                            {providerName}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 sm:line-clamp-none">
                            Donate via {providerName}
                        </p>
                    </div>
                </div>

                <div
                    className={`${colorClass} rounded-xl px-4 sm:px-6 py-2 sm:py-3 border border-transparent flex items-center gap-3 sm:gap-4 text-white w-full sm:w-auto justify-between sm:justify-start`}
                >
                    <div className="text-right">
                        <p className="text-[10px] text-white/80 font-semibold uppercase tracking-wider">
                            {accountName}
                        </p>
                        <code className="text-base sm:text-lg font-mono font-bold text-white block leading-none mt-1">
                            {accountNumber}
                        </code>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:text-white hover:bg-white/20 shrink-0"
                        onClick={copyToClipboard}
                    >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy {accountName}</span>
                    </Button>
                </div>
            </div>
        );
    }

    // Default portrait variant
    return (
        <div className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ${className}`}>
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="h-24 w-auto max-w-[200px] object-contain mb-2 flex items-center justify-center">
                    <img
                        src={logoSrc}
                        alt={`${providerName} Logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.parentElement!.innerText = providerName;
                            target.parentElement!.className =
                                "text-xl font-bold text-gray-600 flex items-center justify-center h-full w-full bg-white rounded-lg";
                        }}
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{providerName}</h3>
                    <p className="text-gray-600 text-sm max-w-[250px]">
                        Support our mission by donating directly via {providerName}.
                    </p>
                </div>

                <div className={`w-full ${colorClass} bg-opacity-10 rounded-xl p-4 border border-opacity-20`}>
                    <p className={`text-xs ${colorClass.replace("bg-", "text-")} font-semibold uppercase tracking-wider mb-1`}>
                        {accountName}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <code className="text-lg font-mono font-bold text-gray-900">
                            {accountNumber}
                        </code>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 text-gray-600 hover:text-black hover:bg-black/5`}
                            onClick={copyToClipboard}
                        >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy {accountName}</span>
                        </Button>
                    </div>
                </div>

                <p className="text-xs text-gray-400">
                    Your contribution makes a difference.
                </p>
            </div>
        </div>
    );
};

export default DonationCard;
